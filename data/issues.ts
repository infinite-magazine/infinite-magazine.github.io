export interface Issue {
  title: string;
  imageSrc: string;
  link: string;
  description: string;
  releaseDate: Date;
}

export const issues: Issue[] = [
  {
    title: 'Issue 12',
    releaseDate: new Date(2025, 1, 1),
    imageSrc: '/issues/12.webp',
    link: 'https://infinitemagazine.mit.edu/#/issue-view/12',
    description:
      'The future of sustainable fashion meets avant-garde design in a world where technology and tradition collide.',
  },
  {
    title: 'Issue 11',
    releaseDate: new Date(2024, 1, 1),
    imageSrc: '/issues/11.webp',
    link: 'https://infinitemagazine.mit.edu/#/issue-view/11',
    description:
      'Exploring the intersection of digital art and physical fashion in the age of augmented reality.',
  },
  {
    title: 'Issue 10',
    releaseDate: new Date(2023, 1, 1),
    imageSrc: '/issues/10.webp',
    link: 'https://infinitemagazine.mit.edu/#/issue-view/10',
    description:
      'A deep dive into the psychology of color and its influence on contemporary fashion narratives.',
  },
  {
    title: 'Issue 09',
    releaseDate: new Date(2022, 1, 1),
    imageSrc: '/issues/9.webp',
    link: 'https://infinitemagazine.mit.edu/#/issue-view/9',
    description:
      'The urban landscape reimagined through the lens of streetwear and architectural fashion.',
  },
  {
    title: 'Issue 08',
    releaseDate: new Date(2021, 1, 1),
    imageSrc: '/issues/8.webp',
    link: 'https://infinitemagazine.mit.edu/#/issue-view/8',
    description:
      'Celebrating the fusion of traditional craftsmanship with cutting-edge manufacturing techniques.',
  },
  {
    title: 'Issue 07',
    releaseDate: new Date(2020, 1, 1),
    imageSrc: '/issues/7.webp',
    link: 'https://infinitemagazine.mit.edu/#/issue-view/7',
    description:
      'The evolution of gender-fluid fashion in a post-binary world of self-expression.',
  },
  {
    title: 'Issue 06',
    releaseDate: new Date(2019, 1, 1),
    imageSrc: '/issues/6.webp',
    link: 'https://infinitemagazine.mit.edu/#/issue-view/6',
    description:
      'Exploring the relationship between artificial intelligence and creative design processes.',
  },
  {
    title: 'Issue 05',
    releaseDate: new Date(2018, 1, 1),
    imageSrc: '/issues/5.webp',
    link: 'https://infinitemagazine.mit.edu/#/issue-view/5',
    description:
      'The renaissance of handcrafted luxury in an increasingly automated world.',
  },
  {
    title: 'Issue 04',
    releaseDate: new Date(2017, 1, 1),
    imageSrc: '/issues/4.webp',
    link: 'https://infinitemagazine.mit.edu/#/issue-view/4',
    description:
      'Fashion as a medium for social commentary and cultural transformation.',
  },
  {
    title: 'Issue 03',
    releaseDate: new Date(2016, 1, 1),
    imageSrc: '/issues/3.webp',
    link: 'https://infinitemagazine.mit.edu/#/issue-view/3',
    description:
      'The intersection of biomimicry and fashion design in creating sustainable materials.',
  },
  {
    title: 'Issue 02',
    releaseDate: new Date(2015, 1, 1),
    imageSrc: '/issues/2.webp',
    link: 'https://infinitemagazine.mit.edu/#/issue-view/2',
    description: 'Digital fashion and virtual identity in the metaverse era.',
  },
  {
    title: 'Issue 01',
    releaseDate: new Date(2014, 1, 1),
    imageSrc: '/issues/1.webp',
    link: 'https://infinitemagazine.mit.edu/#/issue-view/1',
    description:
      'The dawn of a new era in fashion where technology and human creativity merge.',
  },
];
