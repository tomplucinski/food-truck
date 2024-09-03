import { Column, Entity } from 'typeorm';
import { Base } from '.';

@Entity()
export class FoodProvider extends Base {
  @Column({ type: 'int' })
  locationId!: number;

  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'text' })
  type!: string;

  @Column({ type: 'text' })
  address!: string;

  @Column({ type: 'text' })
  permitNumber!: string;

  @Column({ type: 'text' })
  permitStatus!: string;

  @Column({ type: 'simple-json' })
  foodItems!: string;

  @Column({ type: 'float' })
  latitude!: number;

  @Column({ type: 'float' })
  longitude!: number;

  @Column({ type: 'text', nullable: true })
  hours!: string | null;

  @Column({ type: 'text' })
  permitExpiration!: string;
}
