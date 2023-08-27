export class Duty {
  ParentId?: number
  Title: string
  Url: string
  CoverImage: string
  IncludeInSitemap: boolean
  Body: string
  BodyOverview: string
  AllowComments: boolean
  ShowInTopSix: boolean
  ShowInFooter: boolean
  Active: boolean
  Tags: string
  MetaKeywords: string
  MetaDescription: string
  MetaTitle: string
  Id: number
  constructor(duty: Duty) {
    {
      this.Id = duty.Id || 0;
      this.Url = duty.Url;
      this.CoverImage = duty.CoverImage;
      this.ParentId = duty.ParentId;
      this.Title = duty.Title;
      this.IncludeInSitemap = duty.IncludeInSitemap || false;
      this.Body = duty.Body || '';
      this.BodyOverview = duty.BodyOverview || '';
      this.AllowComments = duty.AllowComments || false;
      this.ShowInTopSix = duty.ShowInTopSix || false;
      this.ShowInFooter = duty.ShowInFooter || false;
      this.Active = duty.Active || false;
      this.Tags = duty.Tags || '';
      this.MetaKeywords = duty.MetaKeywords || '';
      this.MetaDescription = duty.MetaDescription || '';
      this.MetaTitle = duty.MetaTitle || '';
    }
  }
}
