---
title: "Prompting Patterns for OpenAI GPT-5.4"
type: prompt-pattern
description: "What works specifically with GPT-5.4 and ChatGPT — system prompts, structured output, verbosity control, Thinking mode, and multi-turn strategies."
last_updated: "2026-04-10"
tags:
  - openai
  - gpt-5.4
  - chatgpt
  - prompt-patterns
---

# Prompting Patterns for OpenAI GPT-5.4

GPT-5.4 is OpenAI's flagship model and the backbone of ChatGPT. It is the most widely used model in the world, which means it has been fine-tuned heavily on conversational patterns and instruction-following. This guide covers what works *specifically* with GPT-5.4 -- the patterns that exploit its strengths and work around its defaults.

For general prompting techniques that work across all models, see the [Prompt Engineering Guide](/guides/prompting).

---

## System Prompts: GPT Follows Them Closely

GPT-5.4 pays strong attention to system prompts. If you are using the API or building with the Assistants API, the system prompt is your most powerful tool. GPT treats it as persistent instructions that override conversational drift.

In ChatGPT, you get the same effect through Custom Instructions (Settings > Personalization > Custom Instructions). Whatever you put there applies to every new conversation.

The key insight: GPT-5.4 handles *detailed* system prompts well. You do not need to be brief -- you can write multi-paragraph instructions and GPT will follow them. Be exhaustive about what you want.

```
System prompt:

You are a senior technical writer at a B2B SaaS company. Your writing
style is clear, direct, and jargon-free. You always:
- Use short sentences (under 20 words when possible)
- Break complex ideas into numbered steps
- Include a concrete example for every abstract concept
- Avoid buzzwords like "leverage," "synergy," and "paradigm"
- End every response with a suggested next step for the reader

When asked to write documentation, always structure it as:
1. One-sentence summary
2. Prerequisites
3. Step-by-step instructions
4. Common errors and fixes
5. Related docs
```

This level of detail works well with GPT-5.4. Other models may lose track of instructions this long, but GPT handles it reliably.

---

## Structured Output: GPT Excels at Format Compliance

GPT-5.4 is exceptionally good at producing structured output when you specify the format explicitly. JSON, markdown tables, CSV, YAML, code blocks -- if you tell GPT exactly what shape you want, it delivers consistently.

For the API, OpenAI offers a dedicated "JSON mode" and structured outputs feature that guarantees valid JSON. But even in plain ChatGPT, specifying format works well.

```
Analyze the following 5 customer reviews and output your analysis as a
JSON array. Each element should have these fields:

- "review_id": sequential number starting at 1
- "sentiment": "positive", "negative", or "mixed"
- "key_topics": array of 1-3 topic strings
- "action_needed": boolean
- "summary": one-sentence summary of the review

Reviews:
1. "Love the new dashboard! So much faster than before."
2. "Support took 3 days to respond to my billing issue."
3. "The API works great but the documentation is outdated."
4. "We're canceling. Too many outages last month."
5. "Good product overall, fair price for what you get."
```

GPT will produce clean, valid JSON with exactly the fields you specified. If you need nested structures or specific data types, specify those too -- GPT respects the schema.

---

## Verbosity Control: Taming the Default Output Length

GPT-5.4 tends verbose. If you do not tell it otherwise, it will produce long, thorough responses with preambles, disclaimers, and extensive explanations. Sometimes that is what you want. Often it is not.

The fix is explicit: tell GPT how long or short you want the response.

```
Explain the difference between TCP and UDP.

Constraints:
- Maximum 4 sentences
- No introductory phrasing like "Great question!" or "Sure!"
- No disclaimers or caveats
- Just the technical comparison, nothing else
```

Other effective verbosity controls:
- "Respond in exactly 3 bullet points"
- "One paragraph maximum"
- "Give me the answer in a single sentence"
- "Skip the preamble -- start with the answer directly"

These work because GPT-5.4's instruction-following is strong. It respects explicit length constraints more reliably than vague requests like "be concise."

---

## Thinking Mode: Built-In Chain-of-Thought

GPT-5.4 Thinking is a variant that has built-in chain-of-thought reasoning for math, science, coding, and other hard reasoning tasks. You do not need to prompt it with "think step by step" -- it automatically engages extended reasoning when the problem warrants it.

When to use Thinking mode vs. standard GPT-5.4:

- **Use Thinking mode** for: math competition problems, formal logic, complex debugging, scientific calculations, multi-step reasoning where accuracy matters more than speed
- **Use standard GPT-5.4** for: writing, conversation, summarization, creative tasks, anything where speed matters

With Thinking mode, you can write straightforward prompts and let the model handle the reasoning process internally:

```
A cylindrical water tank has a radius of 3 meters and a height of 8
meters. Water is being pumped in at a rate of 2 cubic meters per minute.
The tank has a leak at the bottom that lets water out at a rate
proportional to the square root of the current water height, with
proportionality constant 0.5.

Find the steady-state water height and how long it takes to reach 90%
of that height starting from empty.
```

No special prompting needed. GPT-5.4 Thinking will work through the differential equation, find the equilibrium, and solve the transient. With standard GPT-5.4, you would need to explicitly prompt chain-of-thought to get reliable accuracy on this kind of problem.

---

## Multi-Turn Conversations: Maintaining Context

GPT-5.4 maintains context well across long conversations, especially with its 1M token context window. It can reference earlier messages accurately and build on previous outputs without repeating itself.

Patterns that work well in multi-turn:

**Iterative refinement** -- give feedback and GPT improves on its previous output without losing the thread:

```
Turn 1: Write a product description for a noise-canceling headphone
aimed at remote workers.

Turn 2: Good start. Make it more specific about the noise-canceling
technology -- mention ANC with transparency mode. Also cut the length
in half.

Turn 3: Perfect length. Now write 3 variations: one for Amazon listing,
one for our website hero section, one for a Facebook ad.
```

**Reference earlier context** -- GPT can pull from earlier in the conversation:

```
Turn 1: [paste a 5-page requirements document]

Turn 2: Based on the requirements above, write user stories for the
authentication module only. Use the format: "As a [role], I want
[feature], so that [benefit]."

Turn 3: Now estimate story points for each user story you wrote, using
Fibonacci sizing. Add a risk flag for any story that depends on a
third-party API.
```

GPT handles this kind of progressive building well. The main failure mode is when conversations get very long (thousands of turns) -- if you notice GPT losing track, start a new conversation and paste the essential context at the top.

---

## Custom Instructions: Persistent Preferences

In ChatGPT, Custom Instructions let you set two things that apply to every conversation:

1. **"What would you like ChatGPT to know about you?"** -- your background, role, preferences
2. **"How would you like ChatGPT to respond?"** -- style, format, and behavior rules

This is underused. Good Custom Instructions eliminate the need to repeat yourself in every conversation.

Example Custom Instructions setup:

```
What to know about me:
I'm a backend engineer working in Python and Go. I deploy to AWS.
I prefer simple solutions over clever ones. I care about error handling,
testing, and observability. I work on a team of 6 and we use GitHub
for code review.

How to respond:
- Use code examples in Python unless I specify otherwise
- Always include error handling in code samples
- When suggesting architecture, consider cost and operational complexity
- Never suggest solutions that require vendor lock-in without flagging it
- Keep explanations short -- I understand the basics, I need specifics
- If I paste code, assume I want a review unless I say otherwise
```

With this set, every new ChatGPT conversation starts with this context. You skip the setup and go straight to productive output.

---

## Quick Reference

- **System prompts:** GPT-5.4 follows detailed system instructions closely. Be exhaustive -- more detail produces better results.
- **Structured output:** Specify JSON, tables, or other formats explicitly. GPT complies with high reliability. Use JSON mode in the API for guaranteed valid output.
- **Verbosity:** GPT defaults to long responses. Use explicit length constraints ("3 bullet points," "one paragraph max," "skip the preamble") to control output length.
- **Thinking mode:** For math, science, and complex reasoning, use GPT-5.4 Thinking. No special prompt needed -- it auto-engages chain-of-thought.
- **Multi-turn:** GPT maintains context well across long conversations. Use iterative refinement and reference earlier context freely.
- **Custom Instructions:** Set your background and response preferences in ChatGPT settings to avoid repeating yourself. This applies to every new conversation.
- **Format specification:** When you want specific output structure, show GPT the exact schema or template. It is better at matching a provided format than inferring one.
