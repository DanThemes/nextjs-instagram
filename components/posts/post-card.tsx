import { MediaType } from "@/models/Media";
import { PostType } from "@/models/Post";
import Image from "next/image";
import React from "react";

type PostCardType = {
  post: Omit<PostType, "media"> & { media: MediaType[] };
};

export default function PostCard({ post }: PostCardType) {
  let placeholder;

  if (post.media[0] && post.media[0]?.type === "image") {
    placeholder = post.media[0].url;
  } else {
    placeholder =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAGQCAYAAAByNR6YAAAAAXNSR0IArs4c6QAAE9pJREFUeF7t1rENADAMwzD3/6NboDdoZA7wQGTQ2XbnCBAgQIAAAQIEMoEjsDJLQwQIECBAgACBLyCwPAIBAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECDzp4JAQPJO7IgAAAABJRU5ErkJggg==";
  }

  return (
    <div>
      <Image src={placeholder} width={300} height={300} alt="post" />
    </div>
  );
}