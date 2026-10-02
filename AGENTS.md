<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- i18n: copy lives in per-component `{ it, en }` dictionaries read via `useCopy` from src/lib/i18n.tsx — keeps languages extensible without a library.
- Leads (quote, Copy Check) all go through /api/lead with a `kind` field — one delivery path to maintain.
