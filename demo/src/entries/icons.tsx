import { useEffect } from 'react';
import { BotAvatar } from 'bot-avatars';
import { mount } from '../boot';

/* App icons. The large ones show the real plush Blip on the site's fog
 * colour; the small favicon sizes rasterize public/favicon.svg, whose flat
 * face stays legible at 16px. scripts/generate-icons.mjs captures each
 * [data-icon] tile by its bounding box. */

/** Large tiles: [name, size, bot size]. The bot sits inside the maskable
 *  safe zone (the centre 80%), so the 512 icon doubles as `maskable`. */
const TILES: [string, number, number][] = [
  ['icon-512', 512, 290],
  ['icon-192', 192, 110],
  ['apple-touch-icon', 180, 104],
];

const FAVICON_SIZES = [48, 32, 16];

function Icons() {
  useEffect(() => {
    const images = [...document.querySelectorAll('img')];
    void Promise.all(images.map((img) => img.decode())).then(() => {
      document.body.dataset.ready = 'true';
    });
  }, []);

  return (
    <div className="flex items-start gap-10 p-10">
      {TILES.map(([name, size, bot]) => (
        <div
          key={name}
          data-icon={name}
          className="flex shrink-0 items-center justify-center overflow-hidden bg-fog"
          style={{ width: size, height: size }}
        >
          <BotAvatar
            type="square"
            state="default"
            face="mouth"
            size={bot}
            bowTie
            accessoryColor="#FF5A1F"
            paused
            pose={{ yaw: 0, pitch: -0.04 }}
            style={{ transform: `translateY(${size * 0.02}px)` }}
          />
        </div>
      ))}
      {FAVICON_SIZES.map((size) => (
        <img
          key={size}
          data-icon={`favicon-${size}`}
          src="/favicon.svg"
          width={size}
          height={size}
          alt=""
          className="block shrink-0"
        />
      ))}
    </div>
  );
}

mount(<Icons />);
