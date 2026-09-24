# Field Notes

A small field-journal app for a volunteer naturalist group: dated entries with
a place, coordinates, weather and notes; a sketch map of where the entries were
written; and an editor desk for publishing new entries.

Built with [Nuxt 4](https://nuxt.com) (Vue single-file components, file-based
routes, scoped styles). All data lives in memory, loaded from
`server/data/seed.json` when the server starts. There is no database and no
external service.

Used as an Impeccable test repository.

## Pages

| Route | Who | What |
| --- | --- | --- |
| `/` | everyone | Landing page with the latest entries |
| `/entries` | everyone | All entries, newest first. Readers also see “Your saved entries” |
| `/entries/[id]` | everyone | One entry. Signed-in users can save it to their notes |
| `/map` | everyone | Sketch map of entry locations |
| `/about` | everyone | About the group |
| `/login` | everyone | Sign-in form |
| `/admin` | editors | Editor desk overview |
| `/admin/entries/new` | editors | New entry form |

## Accounts

Both accounts are in `server/data/seed.json`.

| Role | Email | Password |
| --- | --- | --- |
| Editor | `editor@field-notes.test` | `fieldnotes-editor` |
| Reader | `reader@field-notes.test` | `fieldnotes-reader` |

Signing in sets an httpOnly `field_notes_session` cookie. Route middleware
sends signed-out visitors on `/admin/**` to `/login`, and readers back to
`/entries`. Saving an entry or publishing one changes only in-memory state;
restarting the server resets everything to the seed.

## Run it

You need Node 22 (see `.nvmrc`) and Yarn 1.

```sh
yarn install
yarn dev            # http://localhost:3000
```

Production build:

```sh
yarn build
node .output/server/index.mjs   # or: yarn preview
```

Set `PORT` to change the port.

## Layout

- `pages/` — file routes, including the nested `admin.vue` parent route
- `components/` — auto-imported components, each with `<style scoped>`
- `assets/css/tokens.css` — design tokens; `DESIGN.md` describes them
- `middleware/session.global.ts` — loads the session and guards `/admin/**`
- `server/api/` — login, logout, session, entries and saved entries
- `server/data/seed.json` — accounts, entries and saved lists
