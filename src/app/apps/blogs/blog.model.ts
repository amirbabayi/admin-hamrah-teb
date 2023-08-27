export class Blog {
  Title: string
  CoverImage: string
  Url: string
  IncludeInSitemap: boolean
  Writer: string
  Category: string
  Body: string
  BodyOverview: string
  AllowComments: boolean
  ShowInTopThree: boolean
  PickedByEditor: boolean
  Active: boolean
  Tags: string
  MetaKeywords: string
  MetaDescription: string
  MetaTitle: string
  Id: number
  constructor(blog: Blog) {
    {
      this.Id = blog.Id || 0;
      this.Title = blog.Title;
      this.CoverImage = blog.CoverImage;
      this.Url = blog.Url;
      this.Writer = blog.Writer || '';
      this.Category = blog.Category || '';
      this.IncludeInSitemap = blog.IncludeInSitemap || false;
      this.Body = blog.Body || '';
      this.BodyOverview = blog.BodyOverview || '';
      this.AllowComments = blog.AllowComments || false;
      this.ShowInTopThree = blog.ShowInTopThree || false;
      this.PickedByEditor = blog.PickedByEditor || false;
      this.Active = blog.Active || false;
      this.Tags = blog.Tags || '';
      this.MetaKeywords = blog.MetaKeywords || '';
      this.MetaDescription = blog.MetaDescription || '';
      this.MetaTitle = blog.MetaTitle || '';
    }
  }
}
