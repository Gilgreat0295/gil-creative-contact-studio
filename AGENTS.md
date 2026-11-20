<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules

- All portfolio content (projects, categories, contact details, showreel, portrait) lives in `src/content/`; pages and components only read it. Why: work can be added or re-tagged without touching templates.
- Categories in `src/content/categories.ts` are the single taxonomy for Services, Work filters and the enquiry form. Why: names must match everywhere.
- Work filters only exist for categories with published projects (`src/lib/portfolio.ts`). Why: no empty filter states.
- Route `validateSearch` must always return every key (set `undefined` to clear). Why: TanStack merges raw params with the validated result, so omitted keys leak invalid values.
- Media goes through `MediaFrame`; missing `src` renders a text-led cover, labelled only in dev. Why: no invented client imagery and no layout shift.
- Animation (GSAP/ScrollTrigger/Lenis) only enhances already-visible content and is skipped under prefers-reduced-motion. Why: the site must work when motion is off or fails.
