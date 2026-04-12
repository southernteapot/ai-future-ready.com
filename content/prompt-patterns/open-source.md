---
title: "Prompting Patterns for Open Source Models"
type: prompt-pattern
id: "prompt-open-source"
description: "What works with self-hosted and API-accessed open models — Llama 4, DeepSeek R1, Qwen 3/3.5, Hermes 4, and others. Covers system prompt formats, quantization-aware prompting, reasoning toggles, and temperature tuning."
last_updated: "2026-04-10"
tags:
  - open-source
  - llama
  - deepseek
  - qwen
  - hermes
  - self-hosted
  - prompt-patterns
---

# Prompting Patterns for Open Source Models

Open source models are a different game. You control the infrastructure, the configuration, and often the prompt template format itself. The patterns that work with proprietary models (GPT, Claude, Gemini) do not always transfer directly -- open models have different system prompt formats, different sensitivity to temperature and quantization, and model-specific features like reasoning toggles.

This guide covers the practical prompting differences for the most capable open models: Llama 4 (Scout and Maverick), DeepSeek R1 and V3.2, Qwen 3 and 3.5, and Hermes 4. These patterns apply whether you are self-hosting or accessing these models through API providers.

For general prompting techniques that work across all models, see the [Prompt Engineering Guide](/guides/prompting).

---

## System Prompt Formats: Model-Specific Templates

Unlike proprietary models where the API handles prompt formatting, open models require you to use the correct chat template. Using the wrong format degrades output quality significantly -- the model may ignore your system prompt, produce garbled output, or fail to follow instructions.

### Llama 4 (Meta)

Llama 4 uses a specific template with `[INST]` tags:

```
<|begin_of_text|><|start_header_id|>system<|end_header_id|>

You are a helpful assistant specializing in Python code review.
Always explain your reasoning before suggesting changes. Focus on
correctness, readability, and performance in that order.
<|eot_id|><|start_header_id|>user<|end_header_id|>

Review this function for issues:

def get_users(db, status):
    query = f"SELECT * FROM users WHERE status = '{status}'"
    return db.execute(query).fetchall()
<|eot_id|><|start_header_id|>assistant<|end_header_id|>
```

If you are using a framework like vLLM, llama.cpp, or Ollama, the template is usually applied automatically. But if you are hitting a raw endpoint or building your own serving stack, you must apply the template yourself. Getting it wrong is one of the most common causes of poor performance with open models.

### ChatML Format (Qwen, Hermes, many others)

Many models use the ChatML format, including Qwen 3/3.5 and Hermes 4:

```
<|im_start|>system
You are a data analyst. When given a dataset, always start by
describing the shape of the data (rows, columns, types) before
analyzing it. Present findings as numbered insights, most important
first.
<|im_end|>
<|im_start|>user
Here's our monthly sales data for 2025:
[paste CSV data]
What trends do you see?
<|im_end|>
<|im_start|>assistant
```

### Alpaca Format (older/fine-tuned models)

Some fine-tuned models still use the Alpaca instruction format:

```
### Instruction:
You are a technical writer. Rewrite the following error message to be
user-friendly. Keep it under 15 words.

### Input:
Error 0x8007045D: The request could not be performed because of an
I/O device error.

### Response:
```

**Rule of thumb:** Check the model card on Hugging Face for the correct chat template before deploying. Most inference failures with open models trace back to prompt formatting issues.

---

## Quantization Awareness: More Explicit Prompts for Smaller Models

When running quantized models (Q4, Q5, Q8 via GGUF), you are trading precision for speed and memory. Q4 models lose some instruction-following ability compared to their full-precision counterparts. The fix is more explicit prompts.

What changes with quantized models:
- They are more likely to drift from complex instructions
- They handle fewer simultaneous constraints
- Ambiguous prompts produce worse results than with full-precision models
- Output formatting is less reliable

Pattern for quantized models -- be brutally explicit:

```
TASK: Classify the following customer email.

CATEGORIES (pick exactly one):
- BILLING: about charges, invoices, refunds, payments
- TECHNICAL: about bugs, errors, how-to, integrations
- ACCOUNT: about login, permissions, settings, cancellation
- OTHER: does not fit above categories

OUTPUT FORMAT: Return ONLY the category name, nothing else.
No explanation. No preamble. Just the single word.

EMAIL:
"Hi, I've been trying to connect your API to our Salesforce instance
but keep getting a 403 error. I've double-checked our API key and it
seems correct. Can someone help?"

CATEGORY:
```

With a full-precision model, you could write this more casually and it would figure out what you want. With a Q4 quantization, the explicit format, the enumerated categories, and the "return ONLY the category name" instruction prevent the model from adding unwanted explanation or picking an off-list category.

---

## DeepSeek R1: Explicit Reasoning Mode

DeepSeek R1 is one of the strongest reasoning models available as open source. It has explicit "think" and "non-think" modes. For hard problems, you want to trigger the thinking mode.

The simplest way:

```
Think step by step.

A company has 3 data centers. Each has an independent failure rate of
2% per month. They need at least 2 data centers running to serve
customers.

What is the probability of a service outage (fewer than 2 data centers
running) in any given month? What about over a full year?

Show your complete calculation.
```

"Think step by step" is not just a suggestion with DeepSeek R1 -- it activates the model's explicit reasoning chain. You will see the model produce a `<think>` block with its working before giving the final answer.

For tasks where you do NOT want the reasoning overhead (simple lookups, formatting, translation), skip the reasoning trigger:

```
Translate the following English text to formal Japanese. Do not explain
your translation choices. Output only the Japanese text.

"We are pleased to announce that the quarterly review meeting has been
rescheduled to March 15th at 2:00 PM."
```

The difference in latency between think mode and direct mode is substantial. Use think mode only when accuracy on a hard problem justifies the wait.

---

## Qwen 3/3.5: Hybrid Reasoning

Qwen 3 and 3.5 support a similar hybrid approach to DeepSeek, with explicit control over whether the model reasons before answering.

**Think mode** (for complex tasks):

```
/think

You are reviewing a distributed system design. The system uses
eventual consistency with a 5-second propagation delay.

A user updates their profile name on Server A, then immediately reads
their profile from Server B. Describe all possible outcomes, the
probability of each, and how you would solve the inconsistency problem
with minimal latency impact.
```

The `/think` prefix tells Qwen to engage its reasoning mode. The model will produce its chain-of-thought before answering.

**Non-think mode** (for fast responses):

```
/no_think

Convert this JSON to a Python dataclass:

{"name": "string", "age": "int", "email": "string", "roles": ["string"],
 "active": "bool"}
```

Qwen 3.5 is particularly strong on multilingual tasks, supporting 201 languages. When working cross-language, specify the output language and script explicitly:

```
/no_think

Summarize the following Japanese article in English. 3 bullet points
maximum. Focus on the business implications, not the technical details.

[paste Japanese text]
```

---

## Hermes Models: Think Tags for Reasoning Control

Hermes 4 (based on Llama 4 Maverick, 405B parameters) supports explicit `<think>` tags that toggle reasoning mode. This gives you fine-grained control over when the model reasons and when it responds directly.

```
<|im_start|>system
You are a code security auditor. When analyzing code, use <think> tags
to reason through potential vulnerabilities before presenting your
findings.
<|im_end|>
<|im_start|>user
Review this authentication function for security issues:

def authenticate(username, password):
    user = db.query(f"SELECT * FROM users WHERE username='{username}'")
    if user and user.password == password:
        return create_session(user.id)
    return None
<|im_end|>
<|im_start|>assistant
<think>
Let me analyze this step by step...
- SQL injection via f-string formatting in the query
- Plaintext password comparison (no hashing)
- No rate limiting or brute force protection
- Session creation doesn't check if user is active/banned
</think>

I found 4 security vulnerabilities in this function...
```

You can also instruct Hermes to skip thinking for simple tasks by telling it not to use `<think>` tags:

```
Do not use <think> tags. Respond directly.

What is the current LTS version of Node.js?
```

---

## Context Limits and Temperature

### Context Windows

Most open models have 128K token context windows -- large by historical standards but notably smaller than the 1M windows offered by GPT-5.4, Claude, and Gemini. Some specifics:

- **Llama 4 Scout:** 10M tokens (the exception -- massive context)
- **Llama 4 Maverick:** 1M tokens
- **DeepSeek R1/V3.2:** 128K tokens
- **Qwen 3.5:** 128K tokens
- **Hermes 4:** 128K tokens

For models with 128K context, plan your prompts accordingly. You cannot paste a full codebase like you can with Claude or Gemini. Instead, provide only the relevant files or sections, and be explicit about what you are including and why:

```
I'm debugging a race condition in our order processing system. Here are
the 3 relevant files (out of ~200 in the codebase). The issue is that
two concurrent orders for the same item can both succeed even when only
one item is in stock.

File 1 - order_service.py (the main order processing logic):
[paste file]

File 2 - inventory.py (stock management):
[paste file]

File 3 - database.py (transaction handling):
[paste file]

Focus on the interaction between these files. The bug is in how
inventory is checked and decremented.
```

### Temperature Settings

Open models often need lower temperature than proprietary models for consistent output. Proprietary models have extensive post-training that stabilizes output; open models can be more erratic at higher temperatures.

Recommended temperature ranges for open models:
- **Factual/analytical tasks:** 0.1 - 0.3
- **Code generation:** 0.2 - 0.4
- **General conversation:** 0.5 - 0.7
- **Creative writing:** 0.7 - 0.9

If you are getting inconsistent output from an open model, lowering the temperature is the first thing to try. A Q4 quantized model at temperature 0.9 will produce noticeably noisier output than the same model at 0.3.

---

## Quick Reference

- **System prompt format:** Use the correct template for your model. Llama 4 uses header tags, Qwen/Hermes use ChatML, some fine-tunes use Alpaca. Check the model card.
- **Quantization:** Q4/Q5 models need more explicit prompts. Enumerate options, specify output format exactly, and use "return ONLY" constraints.
- **DeepSeek R1:** Add "Think step by step" to activate reasoning mode. Skip it for simple tasks to reduce latency.
- **Qwen 3/3.5:** Use `/think` for hard tasks and `/no_think` for fast responses. Strong multilingual support across 201 languages.
- **Hermes 4:** Use `<think>` tags for explicit reasoning control. Tell the model not to use them when you want direct responses.
- **Context limits:** Most open models have 128K context (exceptions: Llama 4 Scout 10M, Maverick 1M). Include only relevant files and explain what you included.
- **Temperature:** Use lower temperatures than proprietary models. Start at 0.3 for factual tasks, 0.5 for conversation, 0.7 for creative work.
- **Verification:** Open models, especially quantized ones, need more output verification than proprietary models. Spot-check factual claims and code correctness.
