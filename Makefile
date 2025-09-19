.PHONY: dev  sync

sync:
	@uv sync

dev: sync
	@uv run mkdocs serve
