export type PortfolioQueryResponse = {
  _type: string;
  _id: string;
  role?: string;
  contractee?: string;
  photos: ImageObject[];
  projectName: string;
  photoCredit: PhotogCredit[];
  projectLocation: string;
}

export interface PhotogCredit {
  photogName: string;
  photoUrl?: string;
}

export interface ImageObject {
  asset?: {
    _updatedAt: string;
    uploadId: string;
    mimeType: string;
    assetId: string;
    _createdAt: string;
    metadata: object;
    originalFilename: string;
    _type: string;
    extension: string;
    _id: string;
    path: string;
    _rev: string;
    url: string;
  };
  _type: "image";
}