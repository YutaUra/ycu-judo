import { Image, MimeType } from "remix-image";

const MOBILE_HERO_RATIO = 0.5;
const TABLET_HERO_RATIO = 0.3;

export const Hero = () => {
  return (
    <div>
      <div className="block sm:hidden overflow-hidden relative">
        <Image
          className="w-full aspect-[1/0.5]"
          src="/images/judo-hero.jpeg"
          responsive={[
            {
              size: {
                width: 480,
                height: 480 * MOBILE_HERO_RATIO,
              },
            },
          ]}
          options={{
            position: "left",
            contentType: MimeType.WEBP,
          }}
        />

        {/* mix blend mode を全て試してみる */}
        {/* {[
          "mix-blend-normal",
          "mix-blend-multiply",
          "mix-blend-screen",
          "mix-blend-overlay",
          "mix-blend-darken",
          "mix-blend-lighten",
          "mix-blend-color-dodge",
          "mix-blend-color-burn",
          "mix-blend-hard-light",
          "mix-blend-soft-light",
          "mix-blend-difference",
          "mix-blend-exclusion",
          "mix-blend-hue",
          "mix-blend-saturation",
          "mix-blend-color",
          "mix-blend-luminosity",
        ].map((v, i) => (
          <h1
            className={
              "absolute left-4 mix-blend-difference text-[rgba(220,220,220,0.9)] text-sm font-bold " +
              v
            }
            key={v}
            style={{
              top: `${i * 5}%`,
            }}
          >
            {`横浜市立大学柔道部(${v})`}
          </h1>
        ))} */}
        <h1 className="absolute bottom-5 max-w-[90%] bg-gradient-to-t from-gray-600/90 to-transparent break-keep left-4 mix-blend-difference text-[rgba(220,220,220,0.9)] text-4xl font-hero">
          横浜市立大学
          <wbr />
          柔道部
        </h1>
      </div>

      <div className="hidden sm:block overflow-hidden relative">
        <Image
          className="w-full aspect-[1/0.3]"
          src="/images/judo-hero.jpeg"
          responsive={[
            {
              size: {
                width: 960,
                height: 960 * TABLET_HERO_RATIO,
              },
            },
          ]}
          options={{
            position: "left",
            contentType: MimeType.WEBP,
          }}
        />

        <h1 className="absolute bottom-5 bg-gradient-to-t from-gray-600/90 to-transparent break-keep left-8 mix-blend-difference text-[rgba(220,220,220,0.9)] text-6xl font-hero">
          横浜市立大学
          <wbr />
          柔道部
        </h1>
      </div>
    </div>
  );
};
