import { MicroCmsResponseModelType } from '@/constants/microCms/base';

export interface NewsContentsType extends MicroCmsResponseModelType {
  title: string;
  description: string;
}
