import {IconDefinition} from '@fortawesome/free-solid-svg-icons';

export default class MenuLink {
  color?: string;
  route?: string;
  role?: Array<string>;
  label: string;
  icon?: IconDefinition;
  active?: string = 'active';
  public selected?: boolean = false;
}
