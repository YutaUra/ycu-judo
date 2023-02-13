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
          loading="eager"
          responsive={[
            {
              size: {
                width: 280,
                height: 280 * MOBILE_HERO_RATIO,
              },
            },
          ]}
          options={{
            position: "left",
            contentType: MimeType.WEBP,
            blurRadius: 1,
          }}
        />

        <h1 className="absolute bottom-5 max-w-[90%] break-keep left-4 mix-blend-difference text-[rgba(220,220,220,0.9)] text-4xl font-hero">
          横浜市立大学
          <wbr />
          柔道部
        </h1>
      </div>

      <div className="hidden sm:block overflow-hidden relative">
        <Image
          className="w-full aspect-[1/0.3]"
          src="/images/judo-hero.jpeg"
          loading="eager"
          responsive={[
            {
              size: {
                width: 720,
                height: 720 * TABLET_HERO_RATIO,
              },
            },
          ]}
          options={{
            position: "left",
            contentType: MimeType.WEBP,
            blurRadius: 1,
          }}
        />

        <h1 className="absolute bottom-5 break-keep left-8 mix-blend-difference text-[rgba(220,220,220,0.9)] text-6xl font-hero">
          横浜市立大学
          <wbr />
          柔道部
        </h1>
      </div>
    </div>
  );
};
