export class CfResult<T> {
  status!: number;
  message!: string;
  id!: number;
  longid!: number;
  extra!: T;
}
