export interface ILoginDto {
  userName: string;
  password: string;
}

export interface IUserDto extends ILoginDto {
  email: string;
  skillTags?: string[];
}

export interface ICodingChallenge {
  id: number;
  title: string;
  description: string;
  creator: string;
  startDate: string;
  duration: number;
  tags: string[];
  participants?: string[];
}