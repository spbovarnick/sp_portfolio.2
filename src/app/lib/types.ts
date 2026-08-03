import { SanityImageMetadata, SanityAssetSourceData } from "@/sanity/types";
import { ImageCrop, ImageHotspot } from "sanity";

export interface PhotogCredit {
  photogName: string;
  photoUrl?: string;
}

export interface ImageObject {
  photos: Array<{
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
    }> | null;
}

export interface AllImageArray {
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
    hotspot?: ImageHotspot | null;
    crop?: ImageCrop | null;
  } | null;
  orientation?: "landscape" | "vertical" | null;
}