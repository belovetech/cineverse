import Movie from '@models/movies';

export default interface UpdateResult {
  affectedCount: number;
  affectedRows: Movie[] | any[];
}
