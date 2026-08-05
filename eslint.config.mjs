import next from "eslint-config-next";

// eslint-config-next ships its own ignores for .next/, out/, build/ and
// next-env.d.ts, so they are not repeated here.
const config = [...next];

export default config;
