export class RankRepository {
  static instance: RankRepository;

  ranks: Rank[];

  constructor() {
    this.ranks = [
      new Rank(1, "Player"),
      new Rank(2, "Staff"),
    ];
  }

  findById(id: number): Rank|null {
    return this.ranks.find(rank => rank.id === id)
      ?? null;
  }


  static i(): RankRepository {
    if (!RankRepository.instance) {
      RankRepository.instance = new RankRepository();
    }

    return RankRepository.instance;
  };
}

export default class Rank {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
};