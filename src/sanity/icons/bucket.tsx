type PaintBucketProps = {
  size: string;
};

const PaintBucket = ({ size }: PaintBucketProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m19 12.13l-6.061 6.077c-1.783 1.788-2.675 2.682-3.77 2.78q-.27.025-.543 0c-1.094-.098-1.986-.992-3.769-2.78l-2.02-2.026a2.87 2.87 0 0 1 0-4.052m16.163 0l-8.082-8.103M19 12.129H2.837m8.081-8.103l-8.081 8.103m8.081-8.103L8.898 2M22 20a2 2 0 1 1-4 0c0-1.105 2-3 2-3s2 1.895 2 3" color="currentColor" /></svg>
);

export default PaintBucket;
