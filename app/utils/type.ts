export interface Room {
_id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  capacity: number;
  size: string;
  amenities: string[];
}

export interface form{
name: string;
roomNumber:string;
description: string;
price: string;
capacity: string;
category:string;
size: string;
image: string;
amenities:string[];
}