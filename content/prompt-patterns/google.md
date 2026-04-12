---
title: "Prompting Patterns for Google Gemini"
type: prompt-pattern
id: "prompt-google"
description: "What works specifically with Gemini 3.1 Pro and Gemini 3 Flash — multimodal prompts, web grounding, Google Workspace integration, multilingual output, and code execution."
last_updated: "2026-04-10"
tags:
  - google
  - gemini
  - prompt-patterns
  - multimodal
---

# Prompting Patterns for Google Gemini

Gemini is Google's model family, and its strengths are different from GPT or Claude. Where GPT leads in ecosystem breadth and Claude leads in instruction precision, Gemini leads in multimodal capabilities, web access, and integration with Google's product suite. The prompting patterns that get the best results from Gemini reflect these differences.

This guide covers Gemini 3.1 Pro (the flagship) and Gemini 3 Flash (the fast, cheap option). Both share the same patterns, but Pro handles more complex tasks and longer reasoning chains.

For general prompting techniques that work across all models, see the [Prompt Engineering Guide](/guides/prompting).

---

## Multimodal: Images, Video, and Audio Natively

Gemini natively processes images, video, and audio alongside text. This is not a bolt-on feature -- Gemini was multimodal from its architecture. You can mix media types in a single prompt and Gemini will reason across all of them.

The key to good multimodal prompts: tell Gemini *what* to look at and *what format* you want the analysis in.

```
[attach image of a restaurant receipt]

Extract all items from this receipt into a structured table with columns:
Item, Quantity, Unit Price, Total. Include tax, tip, and grand total
as separate rows at the bottom.

If any text is unclear or partially obscured, mark it as "[unclear]"
rather than guessing.
```

For video analysis:

```
[attach 2-minute product demo video]

Watch this product demo and create:
1. A timeline of features shown, with timestamps
2. Three strengths of the demo (what was communicated well)
3. Three weaknesses (what was confusing or missing)
4. A suggested 30-second script that covers only the most compelling
   features, suitable for a social media ad
```

For audio:

```
[attach audio file of a customer support call]

Transcribe this call and then analyze it:
- Summarize the customer's issue in 2 sentences
- Rate the support agent's performance (1-5) on: empathy, resolution
  speed, product knowledge
- Flag any moments where the customer expressed frustration
- List any follow-up actions that were promised
```

Gemini handles all of these natively. When attaching multiple files, reference them explicitly ("in the first image," "at the 1:30 mark in the video") so Gemini knows what you are referring to.

---

## Web Grounding: Built-In Search

Gemini has built-in web search capabilities. You do not need a plugin or extension -- Gemini can search the web, read current pages, and ground its responses in real-time information.

This is a major differentiator. Use it for tasks where currency matters:

```
What were the top 3 AI announcements in the past week? For each one:
- What was announced and by whom
- Why it matters
- Link to the primary source

Verify each claim against current search results. Do not rely on your
training data for anything dated after January 2026.
```

Web grounding is also useful for fact-checking within a larger task:

```
I'm writing an article about electric vehicle adoption in Europe.
Here are my draft claims -- verify each one against current data and
correct any that are outdated or wrong:

1. Norway leads EV adoption at over 80% of new car sales
2. The EU plans to ban new ICE vehicles by 2035
3. Germany has the most public charging stations in Europe
4. EV battery costs have fallen below $100/kWh

For each claim, tell me: Accurate / Outdated / Incorrect, and provide
the current correct figure with a source.
```

When you want Gemini to use web search, be explicit. Phrases like "search for current data," "verify against current sources," and "find the latest" signal to Gemini that it should ground its response in live web results rather than training data.

---

## Google Workspace Integration

When using Gemini through Google Workspace (Gmail, Docs, Sheets, Drive), you can reference your own documents directly. This is a workflow advantage no other model matches.

```
Look at the spreadsheet "Q1 Sales Pipeline" in my Google Sheets.

Analyze the data and tell me:
1. Which deals are most likely to close this month (based on stage and
   last activity date)
2. Total pipeline value by sales rep
3. Which deals have been stale for more than 30 days with no activity

Format the results as a summary I can paste into an email to the
sales team.
```

In Gmail:

```
Search my inbox for all emails from the engineering team about the
"Project Atlas" migration in the past 2 weeks.

Summarize:
- Current status of the migration
- Any blockers or risks mentioned
- Action items assigned to me
- Next milestone date
```

The Workspace integration means Gemini can work with your actual data rather than requiring you to copy-paste it. This is Gemini's most underappreciated capability for business users.

---

## Conciseness: Ask for Detail Explicitly

Gemini can default to shorter responses, especially Gemini 3 Flash. If you want comprehensive output, say so explicitly. Do not assume Gemini will elaborate on its own.

```
Short (Gemini's default tendency):

  Explain microservices architecture.

  [Gemini may give a 3-4 sentence overview]

Better:

  Explain microservices architecture in detail. Cover:
  - Core principles and how they differ from monolithic architecture
  - Communication patterns (sync vs async, REST vs gRPC vs messaging)
  - Data management strategies (database per service, event sourcing)
  - Common failure patterns and how to handle them
  - When NOT to use microservices

  Aim for a comprehensive explanation that a mid-level developer could
  use as a reference. Include concrete examples for each point.
```

The fix: be explicit about the depth and breadth you want. Enumerate the sub-topics. Gemini responds well to structured requests where you list exactly what you want covered.

Conversely, if you want Gemini to be *more* concise (which is less common but does happen with Pro), the same techniques that work with GPT apply: "maximum 3 sentences," "one paragraph," "bullet points only."

---

## Multilingual: Strongest Cross-Language Performance

Gemini has the strongest multilingual capabilities of any major model. It handles translation, cross-language analysis, and multilingual content generation with high quality across a wide range of languages.

When working across languages, specify the output language explicitly:

```
I have a customer support FAQ written in English. Translate it to
Brazilian Portuguese (pt-BR), but do not just translate literally.
Adapt the tone and examples to be culturally appropriate for a
Brazilian audience.

For technical terms that are commonly used in English in Brazil
(like "software," "backup," "login"), keep them in English.

After translating, flag any FAQ entries where the answer might need
to be different for Brazilian customers (e.g., payment methods,
business hours, legal requirements).

[paste FAQ content]
```

Gemini also excels at multilingual analysis:

```
Here are customer reviews in 5 languages: English, Spanish, Japanese,
German, and French.

Analyze all reviews together and produce a single English-language
report that covers:
- Overall sentiment distribution across all languages
- Top 3 complaints (with example quotes translated to English)
- Top 3 praised features
- Any concerns that appear only in specific language/market segments

[paste reviews]
```

---

## Code Execution: Run It, Don't Just Write It

Gemini can execute code in its environment, which makes it uniquely useful for data analysis tasks. Instead of just generating code and hoping it works, Gemini can run it and show you the results.

```
Here's a CSV of our website traffic data for the past 12 months.

Run a Python analysis that:
1. Identifies the top 5 traffic sources by volume
2. Calculates month-over-month growth rate for each source
3. Finds any seasonal patterns (are certain months consistently
   higher or lower?)
4. Creates a visualization showing traffic trends by source over time

Show me the chart and a summary of your findings. If any data looks
anomalous, flag it.

[paste or attach CSV data]
```

Gemini will write the Python code, execute it, generate the chart, and narrate the findings. This is faster than the usual workflow of "AI generates code, you copy it to a notebook, you debug it, you run it."

This pattern works best for:
- Data analysis and visualization
- Statistical calculations where you need verified numbers
- Quick data transformations (CSV to JSON, cleaning datasets)
- Prototyping algorithms where you want to see actual output

---

## Quick Reference

- **Multimodal:** Gemini natively processes images, video, and audio. Tell it what to look at and what format you want the analysis in. Reference specific files or timestamps explicitly.
- **Web grounding:** Gemini has built-in search. Use phrases like "verify against current data" and "search for the latest" to trigger web-grounded responses.
- **Google Workspace:** When using Gemini in Workspace, reference your Docs, Sheets, and emails directly. No copy-pasting needed.
- **Conciseness:** Gemini can default to shorter responses. Explicitly ask for comprehensive, detailed output and enumerate the sub-topics you want covered.
- **Multilingual:** Specify the output language explicitly. Gemini handles translation, cross-language analysis, and cultural adaptation well.
- **Code execution:** Ask Gemini to run code, not just write it. Useful for data analysis, visualization, and verifying calculations.
- **Structured requests:** Gemini responds well to numbered lists of requirements. Enumerate what you want rather than describing it in prose.
