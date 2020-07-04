import { MicroCmsResponseDefaultType } from '@/constants/microCms/base';

export interface NewsContentsType extends MicroCmsResponseDefaultType {
  title: string;
  description: string;
}
