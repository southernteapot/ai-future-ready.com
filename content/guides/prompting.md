---
title: "Prompt Engineering Guide — How to Write Better AI Prompts"
type: guide
id: "prompting"
description: "Master prompt engineering from beginner to advanced. Learn zero-shot, few-shot, chain-of-thought, and other techniques to get better results from ChatGPT, Claude, and Gemini."
last_updated: "2026-04-10"
tags:
  - prompt-engineering
  - prompting
  - techniques
---

# Prompt Engineering Guide

How to write prompts that get you exactly what you need from AI. From basic principles to advanced techniques, with real examples you can copy and adapt.

---

## What Is Prompt Engineering?

A "prompt" is the text you type into an AI tool like ChatGPT, Claude, or Gemini. **Prompt engineering** is the skill of writing prompts that consistently produce useful, accurate, and relevant results.

Think of it this way: an AI model is like an incredibly knowledgeable colleague who is eager to help but takes instructions very literally. The more precisely you communicate what you want, the better the result you get back.

Prompt engineering is not about memorizing magic phrases. It is about understanding how AI models interpret your instructions and developing a repeatable approach to communicating effectively with them. Whether you are writing a quick email or building a complex AI workflow, these principles apply.

If you are new to AI entirely, read our [What Is AI? beginner guide](getting-started.md) first, then come back here.

---

## Basic Prompting Principles

Before diving into specific techniques, here are the fundamental principles that apply to every prompt you will ever write:

### 1. Be Specific, Not Vague

The single biggest improvement you can make is being more specific. Vague prompts produce generic output. Specific prompts produce useful output.

```
Bad: Write about dogs.
```

```
Good: Write a 300-word blog post about the top 3 benefits of adopting a
senior dog from a shelter. Target audience: families with young children.
Tone: warm and encouraging.
```

### 2. Provide Context

AI does not know your situation unless you tell it. Include relevant background information to help the model give you a tailored response.

```
Bad: How should I invest my money?
```

```
Good: I'm 30 years old, have $10,000 in savings, no debt, and a stable
job earning $75,000/year. I want to start investing for retirement. I have
a moderate risk tolerance and prefer a hands-off approach. What investment
strategy would you recommend for someone in my situation?
```

### 3. Specify the Format

Tell the AI exactly how you want the output structured. Do you want bullet points? A table? A numbered list? An email? A code block? Say so explicitly.

```
Good: Compare the pros and cons of React vs Vue.js for a small team
building a dashboard app. Format your response as a markdown table with
columns: Feature, React, Vue.js.
```

### 4. Set the Tone and Audience

The same information can be presented in wildly different ways depending on who it is for. Always specify:

- **Who is the audience?** (executives, children, developers, customers)
- **What tone?** (professional, casual, humorous, academic)
- **What level of detail?** (overview, in-depth, executive summary)

### 5. Iterate and Refine

Your first prompt is a starting point, not a final draft. The best results come from a conversation:

1. Write your initial prompt
2. Review the output
3. Identify what is missing, wrong, or not quite right
4. Follow up with refinements: "Make it shorter," "Add more examples," "Focus more on the cost savings angle"

---

## The Anatomy of a Good Prompt

A well-crafted prompt typically has some or all of these components:

```
[Role] You are an experienced marketing copywriter who specializes in
B2B SaaS companies.

[Task] Write 3 subject line options for a cold outreach email.

[Context] The target audience is CTOs at mid-size companies (100-500
employees). We sell a developer productivity platform.

[Format] Format each option as: Subject line | Why it works (1 sentence
explanation).

[Constraints] Keep each subject line under 50 characters. No clickbait
or spam-sounding language.
```

Not every prompt needs all five components. A quick question might just need the task. But for any important output, the more of these components you include, the better your results will be.

---

## Core Prompting Techniques

These are the essential techniques every prompt engineer should know. They are listed roughly in order of complexity.

### Zero-Shot Prompting (Beginner)

This is the simplest approach: you give the AI a task with no examples. You are relying entirely on the model's training to understand what you want.

```
Classify the sentiment of this customer review as Positive, Negative,
or Neutral:

"The product arrived on time but the packaging was damaged. The item
itself works fine though."

Sentiment:
```

Zero-shot works well for straightforward tasks where the AI has strong training data. It is less reliable for unusual or ambiguous tasks.

### Few-Shot Prompting (Beginner)

You provide 2-3 examples of the input-output pattern you want before giving the AI the actual task. This is one of the **most powerful and universally useful** techniques.

```
Classify the sentiment of customer reviews.

Review: "Absolutely love this product! Best purchase I've made all year."
Sentiment: Positive

Review: "Terrible quality. Broke after two days of use."
Sentiment: Negative

Review: "The product arrived on time but the packaging was damaged. The
item itself works fine though."
Sentiment:
```

By showing the model examples, you are teaching it exactly what format, style, and logic you expect. This dramatically improves consistency and accuracy, especially for classification, extraction, and formatting tasks.

### Chain-of-Thought (CoT) Prompting (Intermediate)

Ask the AI to "think step by step" before giving its final answer. This significantly improves accuracy on reasoning, math, and logic problems by forcing the model to show its work.

```
Bad: A store sells apples for $2 each. If I buy 3 apples and pay with
a $20 bill, and there's an 8% sales tax, how much change do I get?
```

```
Good: A store sells apples for $2 each. If I buy 3 apples and pay with
a $20 bill, and there's an 8% sales tax, how much change do I get?

Think through this step by step, showing your calculations at each stage
before giving the final answer.
```

Chain-of-thought prompting is especially effective for:

- Math and arithmetic problems
- Logic puzzles
- Multi-step reasoning tasks
- Debugging code
- Analyzing complex scenarios with multiple variables

### Role Prompting (Beginner)

Assign the AI a specific role or persona. This primes the model to draw on patterns associated with that expertise, producing more domain-appropriate responses.

```
You are a senior software engineer with 15 years of experience in Python
and distributed systems. You value clean, readable code and always
consider edge cases.

Review this function and suggest improvements:

def process_data(items):
    result = []
    for i in items:
        if i > 0:
            result.append(i * 2)
    return result
```

Effective roles to try: teacher, editor, critic, consultant, interviewer, translator, coach, devil's advocate. The more specific you make the role, the more targeted the output.

---

## System Prompts and Instructions

Many AI platforms (including the APIs for ChatGPT and Claude) support **system prompts** -- special instructions set at the beginning of a conversation that guide the AI's behavior throughout the entire interaction.

Even in consumer chatbots, you can achieve a similar effect by putting your instructions at the start of the conversation:

```
Instructions for this conversation:
- You are a friendly, patient tutor helping me learn Spanish.
- Always respond with both the Spanish phrase and the English translation.
- Correct my mistakes gently and explain why.
- Use simple vocabulary appropriate for a beginner (A1-A2 level).
- At the end of each response, give me a short practice exercise.

Let's start. How do I say "Where is the nearest restaurant?" in Spanish?
```

System-style instructions are especially useful when you want consistent behavior across a long conversation. Some tips:

- Put instructions at the **very beginning** of the conversation for maximum effect
- Use clear, direct language (do/do not rather than should/could)
- Be explicit about what you want *and* what you do not want
- You can restate key instructions mid-conversation if the AI starts drifting

---

## Advanced Techniques

These techniques build on the fundamentals and are useful for getting the best results on complex or high-stakes tasks.

### Self-Consistency (Advanced)

Ask the AI to generate multiple independent answers to the same question, then pick the most common answer or ask it to synthesize the best response. This reduces the chance of getting a random incorrect output.

```
I need to decide whether to lease or buy a car. Here are my details:
- Annual mileage: ~12,000 miles
- Budget: $500/month max
- I keep cars for 5-7 years
- Good credit score (740)

Generate 3 independent analyses of whether I should lease or buy,
considering different angles (financial, practical, long-term value).
Then synthesize these into a final recommendation with your confidence
level.
```

### Tree-of-Thought (ToT) (Advanced)

An extension of chain-of-thought where the AI explores multiple reasoning paths, evaluates each one, and selects the most promising approach. Useful for complex problems with multiple possible solution paths.

```
I want to increase our SaaS product's free-to-paid conversion rate
(currently 2.1%).

Explore 3 different strategic approaches to solve this problem. For each
approach:
1. Describe the strategy
2. List specific tactics
3. Assess likely impact (high/medium/low)
4. Identify risks or downsides

After exploring all 3, recommend which approach (or combination) you'd
prioritize and explain why.
```

### ReAct (Reasoning + Acting) (Advanced)

A prompting pattern where you ask the AI to alternate between thinking (reasoning about what to do) and acting (taking a step). This is the pattern behind AI agents and tool-using systems.

```
Help me debug why our website's contact form isn't sending emails. Work
through this methodically.

For each step:
- THOUGHT: What could be causing this issue? What should I check next?
- ACTION: What specific thing should I do or check?
- OBSERVATION: [I'll tell you what I find]

Then repeat until we've identified and fixed the issue. Start with your
first thought.
```

### Constraint-Based Prompting (Intermediate)

Explicitly list what the AI should and should not do. This is especially useful for avoiding common failure modes like verbosity, off-topic tangents, or hallucinated information.

```
Explain how HTTPS encryption works.

Constraints:
- Use a metaphor that a 12-year-old could understand
- Keep it under 150 words
- Do NOT mention specific algorithms or cipher suites
- Do NOT use the words "key exchange" or "handshake"
- End with a one-sentence summary
```

---

## Common Mistakes and How to Fix Them

### Mistake 1: Being too vague

"Write me a marketing email" gives the AI almost nothing to work with.

**Fix:** Include the product, audience, goal, tone, length, and call-to-action. The more detail, the better.

### Mistake 2: Asking multiple unrelated things at once

"Write a blog post, also create a social media calendar for next month, and analyze our competitor's pricing" -- this overwhelms the model.

**Fix:** Break complex requests into separate prompts. One task per prompt generally produces better results.

### Mistake 3: Not specifying the output format

Without format instructions, the AI guesses what you want and often produces long, essay-style responses when you wanted bullet points.

**Fix:** Always state the desired format: "Respond with a bulleted list," "Format as a table," "Give me a one-paragraph summary."

### Mistake 4: Accepting the first output

The first response is almost never perfect. Treating it as final means you are leaving quality on the table.

**Fix:** Always do at least one round of refinement. Ask the AI to improve weak areas, add missing details, or try a different angle.

### Mistake 5: Trusting AI output without verification

AI can confidently state incorrect facts, invent fake sources, and produce plausible-sounding nonsense.

**Fix:** Always fact-check specific claims, statistics, quotes, and citations. Use AI output as a starting draft, not a final source of truth.

---

## Prompting Tips by Model

While the core principles work across all models, each AI has slight differences in how it responds. Here are some model-specific tips:

### OpenAI GPT-5.4 / ChatGPT

- GPT-5.4 responds well to **detailed system prompts** and follows formatting instructions closely
- Tends to be verbose by default -- explicitly ask for concise responses if you want them
- Excellent with **structured output** (JSON, tables, code blocks) when you specify the format
- The "Custom Instructions" feature in ChatGPT lets you set persistent preferences that apply to all conversations
- For complex reasoning, use **GPT-5.4 Thinking** mode which has built-in chain-of-thought reasoning for math, science, and hard problems
- With a 1M token context window, you can now feed entire codebases or long documents in a single prompt

### Anthropic Claude (Opus 4.6 / Sonnet 4.6)

- Claude excels at **long, nuanced instructions** -- it handles complex multi-part prompts very well
- Particularly strong at following **constraint-based prompts** ("do this but not that")
- Has a massive 1M token context window across all tiers, so you can paste entire documents and codebases
- Claude tends to be more measured and less likely to confidently state incorrect information
- Works well with **XML-style tags** in prompts (e.g., `<instructions>`, `<context>`) for clearly separating different parts of your prompt
- Opus 4.6 leads on coding benchmarks (80.8% SWE-bench) -- ideal for complex coding and agentic tasks

### Google Gemini 3.1 Pro

- Gemini has **built-in web access**, making it excellent for research and current events
- Strong **multimodal capabilities** -- natively processes text, images, video, and audio in a single prompt
- Integrates deeply with Google Workspace (Docs, Sheets, Gmail), so prompts can reference your existing documents
- For factual queries, it often provides source links (since it can search the web), which makes verification easier
- May default to shorter responses; ask for detailed or comprehensive output explicitly

### Open-Source Models (Llama 4, Gemma 4, DeepSeek, Qwen)

- Open-source models now rival proprietary ones on many tasks -- **Llama 4 Maverick** scored #2 on LMArena
- **Gemma 4** from Google runs on phones to workstations and is excellent for local/private use
- **DeepSeek R1** is great for math and reasoning but less polished on creative writing -- be explicit about the style you want
- **Qwen 3.5** supports 201 languages and excels at multilingual tasks -- specify the output language clearly
- When self-hosting, quantized models (Q4/Q5) are slightly less capable -- use more explicit prompts and verify outputs for critical tasks

### xAI Grok 4.20

- Grok has the **lowest hallucination rate** of any model -- ideal for factual, accuracy-critical tasks
- Has real-time access to X/Twitter data, making it strong for current events and social media analysis
- The multi-agent mode can tackle complex research tasks by coordinating parallel workflows
- #1 on instruction following (IFBench) -- it sticks closely to what you ask for

For a detailed comparison of all 33+ models' capabilities, pricing, and hardware requirements, see our [AI Model Comparison](/models) page.

---

## Prompt Templates for Common Tasks

Here are ready-to-use templates you can adapt for your own needs. Copy them, fill in the bracketed sections, and you are good to go.

### Email Writing

```
Write a [type: professional/casual/formal] email to [recipient].

Purpose: [what you want to achieve]
Key points to cover:
- [point 1]
- [point 2]
- [point 3]

Tone: [friendly/direct/persuasive/apologetic]
Length: [short (2-3 sentences) / medium (1 paragraph) / detailed]
Call to action: [what you want the recipient to do next]
```

### Content Summarization

```
Summarize the following [document/article/report] in [number] bullet
points.

Focus on: [key themes or questions you care about]
Audience: [who will read the summary]
Include: [any specific details you need, e.g., statistics, action items,
deadlines]
Exclude: [anything you want left out]

[Paste the content here]
```

### Code Review

```
Review this [language] code for:
1. Bugs or logical errors
2. Performance issues
3. Security vulnerabilities
4. Readability improvements
5. Best practice violations

For each issue found, explain:
- What the problem is
- Why it matters
- How to fix it (with corrected code)

[Paste your code here]
```

### Learning / Explaining Concepts

```
Explain [concept] to me as if I'm [level: a complete beginner / an
intermediate learner / a professional in a related field].

Use:
- A real-world analogy
- One concrete example
- No jargon (or define any technical terms you use)

Then give me 3 follow-up questions I should explore to deepen my
understanding.
```

### Decision Making

```
Help me decide between [Option A] and [Option B].

Context: [your situation, constraints, and goals]

For each option, analyze:
1. Pros (at least 3)
2. Cons (at least 3)
3. Best-case scenario
4. Worst-case scenario
5. Who this option is best suited for

Then give me your recommendation with a confidence level
(high/medium/low) and explain your reasoning.
```

For more model-specific templates and reusable structures, visit our [Prompt Patterns](/prompt-patterns).

---

## What to Read Next

You now have a solid foundation in prompt engineering. Here are some next steps:

- **[Prompt Patterns](/prompt-patterns)** -- Browse model-specific prompting patterns you can adapt for writing, coding, analysis, and more.
- **[Compare AI Models](/models)** -- Find the right model for your tasks with our detailed comparison.
- **[What Is AI?](getting-started.md)** -- Go back to basics with our complete beginner's guide.
- **[AI Glossary](/glossary)** -- Look up any AI term you encounter in plain English.
