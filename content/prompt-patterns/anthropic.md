---
title: "Prompting Patterns for Anthropic Claude"
type: prompt-pattern
id: "prompt-anthropic"
description: "What works specifically with Claude Opus 4.6, Sonnet 4.6, and Haiku 4.5 — XML tags, long context, constraint following, extended thinking, and tiered instructions."
last_updated: "2026-04-10"
tags:
  - anthropic
  - claude
  - opus
  - sonnet
  - haiku
  - prompt-patterns
---

# Prompting Patterns for Anthropic Claude

Claude handles prompts differently than GPT or Gemini. It was trained with a focus on instruction-following precision, long-context reasoning, and nuanced output. The patterns that get the best results from Claude are specific to how it processes structure and constraints.

This guide covers Claude Opus 4.6, Sonnet 4.6, and Haiku 4.5. The same patterns work across all three tiers -- Opus is the most capable, Sonnet is the best balance of speed and quality, and Haiku is the fastest and cheapest.

For general prompting techniques that work across all models, see the [Prompt Engineering Guide](/guides/prompting).

---

## XML Tags: Claude's Secret Weapon

Claude responds exceptionally well to XML-style tags for organizing prompt sections. This is the single most impactful pattern for Claude -- it dramatically improves how Claude parses and follows complex prompts.

The tags are not real XML and do not need to be valid markup. They are structural markers that tell Claude "this section is context," "this section is instructions," "this section is an example." Claude was specifically trained to recognize and respect these boundaries.

```
<instructions>
You are a code reviewer. Review the code below for bugs, performance
issues, and readability. For each issue, explain the problem and
provide a fix.

Rules:
- Focus only on substantive issues, not style nitpicks
- Rate overall code quality on a scale of 1-10
- If the code is good, say so briefly and move on
</instructions>

<context>
This is a Python microservice that handles payment processing. It runs
on AWS Lambda with a 30-second timeout. The team uses Python 3.12 and
follows PEP 8.
</context>

<code>
def process_payment(amount, currency, customer_id):
    response = stripe.charges.create(
        amount=amount,
        currency=currency,
        customer=customer_id
    )
    db.execute("INSERT INTO payments VALUES (?, ?, ?)",
               (customer_id, amount, response.id))
    return {"status": "success", "charge_id": response.id}
</code>
```

Common tags that work well with Claude:
- `<instructions>` -- what you want Claude to do
- `<context>` -- background information
- `<examples>` -- input/output examples
- `<constraints>` -- rules and boundaries
- `<input>` or `<document>` -- the content to process
- `<output_format>` -- how you want the response structured

You can nest them, combine them, and invent your own. Claude treats any XML-like tag as a section boundary.

---

## Long Context: Put the Question After the Context

With 1M tokens of context across all tiers, Claude can process entire codebases, full document collections, and lengthy datasets in a single prompt. But *where* you place your question matters.

The pattern: put all context material first, then your question or instructions at the end. Claude weights the end of the prompt more heavily for determining what to do, while the beginning serves as reference material.

```
<documents>

<document title="Q1 Financial Report">
[... 15 pages of financial data ...]
</document>

<document title="Q2 Financial Report">
[... 15 pages of financial data ...]
</document>

<document title="Board Meeting Notes - March">
[... 5 pages of meeting notes ...]
</document>

</documents>

<instructions>
Based on the documents above, answer these questions:

1. What was the quarter-over-quarter revenue growth rate?
2. Which product line showed the largest margin improvement?
3. What risks were discussed in the board meeting that could affect Q3?

For each answer, cite the specific document and section where you found
the information.
</instructions>
```

This "context first, question last" pattern produces noticeably better results than putting the question at the top. Claude will reference the full context but focus its response on the instructions at the end.

---

## Constraint Following: "Do This But Not That"

Claude excels at following explicit constraints -- especially negative constraints. If there are things you *do not* want Claude to do, say so directly. Claude is more reliable at respecting boundaries than most models.

```
<instructions>
Explain blockchain technology for a business audience.

Do:
- Use analogies from traditional business (ledgers, contracts, audits)
- Keep paragraphs under 4 sentences
- Include one real-world use case that is NOT cryptocurrency

Do not:
- Mention Bitcoin, Ethereum, or any specific cryptocurrency
- Use technical jargon (hash, nonce, Merkle tree, consensus mechanism)
- Include disclaimers about volatility or investment risk
- Start with a dictionary-style definition
</instructions>
```

Claude handles this "do/do not" pattern cleanly. It will follow the positive instructions while reliably avoiding the negative ones. This is particularly useful for:

- Content generation where you need to avoid certain topics
- Code generation where you want to exclude certain libraries or patterns
- Analysis where you want to focus on specific angles and ignore others

---

## Extended Thinking: For Complex Tasks

Claude's extended thinking feature gives the model time to reason through complex problems before responding. Unlike GPT-5.4 Thinking, this is not activated by the prompt itself -- it is an API parameter (`thinking: { type: "enabled", budget_tokens: 10000 }`).

In Claude.ai (the web interface), extended thinking is available as a toggle. Turn it on for:

- Complex coding tasks (architecture decisions, debugging multi-file issues)
- Math and logic problems
- Long-document analysis where synthesis is required
- Any task where you notice Claude's first answer is shallow or wrong

You do not need to prompt "think step by step" with Claude. If extended thinking is enabled, Claude will automatically use it when the task warrants it. Your prompt should focus on *what* you want, not *how* Claude should think.

```
<context>
[paste a 2,000-line Python codebase here]
</context>

<instructions>
This codebase has a bug: when two users simultaneously update the same
record, one update is silently lost. Find the race condition, explain
why it happens, and provide a fix that uses optimistic locking.
</instructions>
```

With extended thinking enabled, Claude will reason through the codebase methodically before responding. Without it, Claude might jump to the most obvious candidate and miss the actual bug.

---

## Nuanced Writing: Give Claude a Voice

Claude produces less formulaic prose than most models. It does not default to the "listicle with emoji" style that plagues AI-generated content. But to get the best writing out of Claude, give it a specific voice or style to match rather than just a topic.

```
<instructions>
Write a 500-word essay arguing that most productivity advice is
counterproductive.

Voice and style:
- Write like Paul Graham: conversational but intellectually rigorous
- Short paragraphs (2-3 sentences max)
- Start with a contrarian observation, not a thesis statement
- Use specific examples, not generic ones
- No bullet points, no headers, no bold text -- just flowing prose
- The tone should be "smart friend explaining something at dinner,"
  not "business blog post"
</instructions>
```

Claude responds well to style references (named authors, publications, specific tones) and to explicit structural guidance. The more specific you are about *how* you want something written, the more distinctive the output.

---

## Artifacts: Standalone Outputs in Claude.ai

When using Claude.ai, Claude can create "artifacts" -- standalone pieces of content that appear in a separate panel. These include code files, HTML pages, SVG graphics, diagrams, and interactive React components.

To trigger artifact creation, be explicit about wanting a standalone output:

```
Create an interactive calculator that converts between Celsius and
Fahrenheit. It should:
- Have a single input field with a toggle for C→F or F→C
- Update the result in real-time as the user types
- Show the formula used below the result
- Use clean, minimal styling with a dark theme

Make this as a standalone interactive artifact.
```

Claude will produce a complete, runnable React component. Artifacts are useful when you want something you can copy, download, or interact with directly rather than reading it inline in the conversation.

---

## Tiered Instructions: Hierarchical Prompts

Claude handles hierarchical instructions well. You can give it a high-level goal, then specific rules, then examples -- and it will respect all three levels without losing track.

```
<goal>
You are helping me prepare for a job interview at a senior engineering
level. Your job is to ask me technical questions, evaluate my answers,
and give me honest feedback.
</goal>

<rules>
- Ask one question at a time
- Wait for my answer before proceeding
- After I answer, rate it on a scale of 1-5 and explain what a
  perfect answer would include
- Vary difficulty: alternate between medium and hard questions
- Cover these topics: system design, algorithms, behavioral
- If I say "skip," move to the next question without judgment
- After 10 questions, give me an overall assessment with specific
  areas to improve
</rules>

<examples>
Good question: "Design a URL shortening service that handles 100M
new URLs per day. Walk me through your approach."

Bad question: "What is a hash table?" (too basic for senior level)

Good feedback: "3/5. You covered the basic architecture well but
didn't address data partitioning or cache invalidation, which are
critical at this scale. A strong answer would also discuss trade-offs
between consistency and availability."
</examples>

Start with your first question.
```

The three-tier structure (goal, rules, examples) gives Claude a clear hierarchy: the goal defines success, the rules define behavior, and the examples calibrate quality. Claude follows all three levels simultaneously without conflating them.

---

## Quick Reference

- **XML tags:** Use `<instructions>`, `<context>`, `<examples>`, and similar tags to separate prompt sections. This is the highest-impact pattern for Claude.
- **Long context:** With 1M tokens, paste entire documents and codebases. Always put your question/instructions *after* the context, not before.
- **Constraints:** Claude excels at "do this but not that" instructions. Be explicit about both what you want and what you want to avoid.
- **Extended thinking:** Activated via API parameter or toggle in Claude.ai, not by prompt. Use it for complex reasoning, debugging, and multi-document analysis.
- **Writing quality:** Give Claude a specific voice, style reference, or structural guidance. It produces less formulaic output than most models when given room.
- **Artifacts:** In Claude.ai, ask for "standalone" or "interactive" outputs to get artifacts (code, HTML, diagrams) in a separate panel.
- **Tiered instructions:** Structure complex prompts as goal (what) > rules (how) > examples (calibration). Claude respects the hierarchy.
- **Negative instructions:** "Do not" instructions are followed reliably. Use them to prevent common AI output patterns you want to avoid.
