// Definición de un vector simple para cálculos físicos
export class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  add(v) {
    this.x += v.x;
    this.y += v.y;
  }
  multiply(n) {
    this.x *= n;
    this.y *= n;
  }
}

export class DNA {
  constructor(length, genes) {
    // El ADN es un array de vectores de fuerza aleatorios
    this.genes =
      genes ||
      Array.from({ length }, () => {
        const angle = Math.random() * Math.PI * 2;
        return new Vector(Math.cos(angle) * 0.1, Math.sin(angle) * 0.1);
      });
  }

  // Combinar ADN de dos padres (Crossover)
  crossover(partner) {
    const newGenes = this.genes.map((gene, i) =>
      Math.random() > 0.5 ? gene : partner.genes[i],
    );
    return new DNA(this.genes.length, newGenes);
  }

  // Mutación aleatoria
  mutate(rate) {
    this.genes = this.genes.map((gene) => {
      if (Math.random() < rate) {
        const angle = Math.random() * Math.PI * 2;
        return new Vector(Math.cos(angle) * 0.1, Math.sin(angle) * 0.1);
      }
      return gene;
    });
  }
}
