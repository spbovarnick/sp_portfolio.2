const getDataset = () => {
  let dataset, errorMessage;
  if (process.env.NODE_ENV === "development") {
    // return assertValue(process.env.NEXT_PUBLIC_SANITY_DEV_DATASET as string, "Missing environment variable: NEXT_PUBLIC_SANITY_DEV_DATASET")
    dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
    errorMessage = "Missing environment variable: NEXT_PUBLIC_SANITY_DEV_DATASET"
  }
  if (process.env.NODE_ENV === "production") {
    dataset = process.env.NEXT_PUBLIC_SANITY_PROD_DATASET;
    errorMessage = "Missing environment variable: NEXT_PUBLIC_SANITY_PROD_DATASET"
  }
  return assertValue(dataset as string, errorMessage as string)
};

export const dataset = getDataset();

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-02-12'

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
