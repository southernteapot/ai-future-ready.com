# TODO

Track current project tasks here.

## Current

- Add query filtering to `/api/v1/models` or a generated equivalent endpoint for common agent queries: `capability`, `provider`, `availability_status`, `deprecated`, `model_type`, `context_min`, and pricing ceilings.
- Add structured compare/diff support for model-to-model questions after filtering is in place.
- Decide whether `agent-memory/` should be tracked in git for this repo.

## Later

- Evaluate hosted remote MCP after the API contract and query layer are stronger.
- Consider explicit cache headers / ETag documentation for generated API and feed artifacts.
- Consider `/status` freshness and source-health reporting.
