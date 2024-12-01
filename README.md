# ATProto Browser

<img src="public/atproto-browser.svg" alt="ATProto Browser" width="100" />

ATProto Browser is a Next.js app that allows you to browse files stored on the atmosphere.
There are several alternatives available, but this one is mine.

[https://atproto-browser.haroldadmin.com](https://atproto-browser.haroldadmin.com)

- The app uses React Server components to fetch data on the server wherever possible. Features that require client side data fetching, such as pagination for records, are implemented with client side data fetching.
- Consistent and predictable URLs: `/at/:did/:collection/:rkey`
- Support for various record types, with fallback to stringified JSON for unknown types
  - We currently support specialised rendering popular record types, such as `app.bsky.feed.post`, `app.bsky.graph.follow`, etc.
  - You can help by expanding the list of supported record types!

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/haroldadmin/atproto-browser.git
```

2. Install dependencies

```bash
yarn
```

3. Run the development server

```bash
yarn dev
```

## Contributing

This project is open for contributions. Feel free to open an issue or submit a PR.

## Disclaimer

This project is not affiliated with or endorsed by Bluesky, or the team behind Atproto.
