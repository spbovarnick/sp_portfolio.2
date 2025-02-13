import { SanityImageMetadata, SanityAssetSourceData } from "@/sanity/types";

export interface PhotogCredit {
  photogName: string;
  photoUrl?: string;
}

export interface ImageObject {
  asset: {
        _id: string;
        _type: "sanity.imageAsset";
        _createdAt: string;
        _updatedAt: string;
        _rev: string;
        originalFilename?: string;
        label?: string;
        title?: string;
        description?: string;
        altText?: string;
        sha1hash?: string;
        extension?: string;
        mimeType?: string;
        size?: number;
        assetId?: string;
        uploadId?: string;
        path?: string;
        url?: string;
        metadata?: SanityImageMetadata;
        source?: SanityAssetSourceData;
      } | null;
  _type: "image";
}