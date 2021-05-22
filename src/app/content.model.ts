export interface Content {
  title: string;
  subtitle: string;
  aboutContent: {
    content: { content: { value }[] }[];
  };
  aboutTitle: string;
  servicesTitle: string;
  firstServiceTitle: string;
  firstServiceContent: string;
  secondServiceTitle: string;
  secondServiceContent: string;
  pricingTitle: string;
  firstPricingTitle: string;
  firstPricingContent: string;
  secondPricingTitle: string;
  secondPricingContent: string;
  contactTitle: string;
  contactContent: {
    content: { content: { value }[] }[];
  };
}
