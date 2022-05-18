export const data = {
  users: [
    {
      id: 5,
      username: "fordorth",
      firstName: "Thomas",
      lastName: "Gould"
    },
    {
      id: 42,
      username: "firebird2552",
      firstName: "For",
      lastName: "Dorth"
    }
  ],
  events: [
    {
      userId: 5,
      date: "4/29/2022",
      length: "half-day",
      potential_cause: "High Anger",
      severity: 6,
      symptoms: ["Blurred Vission", "Dizzy", "neuasa", "increased fatigue"],
      medications: ["Divolproex", "Ajovy", "Verapamil", "Sumatriptin"],
      side_effects: ["Full body pain", "muscle weakness"]
    },
    {
      userId: 5,
      date: "4/30/2022",
      length: "2 hours",
      potential_cause: "frustration",
      severity: 5,
      symptoms: ["Dizzy", "increased fatigue"],
      medications: ["Divolproex", "Ajovy", "Verapamil"],
      side_effects: [null]
    },
    {
      userId: 42,
      date: "4/30/2022",
      length: "2 hours",
      potential_cause: "frustration",
      severity: 5,
      symptoms: ["Dizzy", "increased fatigue"],
      medications: ["Divolproex", "Ajovy", "Verapamil"],
      side_effects: [null]
    }
  ],
  medications: [
    {
      id: 1,
      name: "divalproex",
      dose: "1"
    }
  ]
};
