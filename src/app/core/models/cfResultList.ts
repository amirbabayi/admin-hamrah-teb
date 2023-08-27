export class CfResultList<T> {
  status!: number;
  message!: string;
  id!: number;
  longid!: number;
  data!: T[];
  recordsFiltered!: number;
  recordsTotal!: number;
}
