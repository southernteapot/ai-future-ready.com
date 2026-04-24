---
title: "Build a Coding Agent Stack"
type: guide
id: "build-a-coding-agent-stack"
description: "A practical recipe for building a coding-agent workflow with model selection, repo access, tests, permissions, review, and rollback."
last_updated: "2026-04-24"
tags:
- "recipe"
- "coding-agent"
- "software-engineering"
- "agents"
- "workflow"
---

# Build a Coding Agent Stack

Use this recipe when a user wants an AI system that can work on a codebase, not just answer coding questions.

## Minimal Stack

- Coding agent: Claude Code, Copilot Agent Mode, Devin, or custom framework
- Model: start with the [coding playbook](/guides/choose-a-coding-model)
- Repo access: read/write scoped to the project
- Test command: known and repeatable
- Review path: diff review before merge
- Rollback path: git branch or pull request

## Workflow

1. Create a branch per task.
2. Give the agent the goal and acceptance checks.
3. Let the agent inspect the repo before editing.
4. Require tests or targeted verification.
5. Review diff before merge.
6. Record what changed and why.

## Guardrails

- No secrets in prompts.
- No broad shell permissions without review.
- No production deploys from an unreviewed agent.
- No dependency upgrades unless requested.
- No destructive git operations by default.

## Model Guidance

Use a strong model for planning and hard edits. Use cheaper models for repetitive transformations only when tests catch regressions.

## Failure Mode

The common mistake is giving an agent a vague task and full repo permissions. A coding agent performs best with a narrow goal, a known verification path, and bounded write access.
