interface Car {
    make: string;
    color: string;
    registration: string;
    owner: string;
  }
  
  interface Bicycle {
    make: string;
    color: string;
    owner: string;
  }
  
  const carpark: Car[] = [
   {
      make: "Toyota Yaris",
      color: "Red",
      registration: "231WD1234",
      owner: "Jane Smith",
   },
   {
      make: "Suzuki Swift",
      color: "Blue",
      registration: "241WD4321",
      owner: "Paul O Regan",
   },
   {
      make: "Ford Puma",
      color: "Blue",
      registration: "241WD1212",
      owner: "Eileen Silk",
   },
  ];
  
  const bicycleShed: Bicycle[] = [
   {
      make: "Revel Rascal XO",
      color: "Blue",
      owner: "Cindy Tamoka",
   },
   {
      make: "Yeti SB140 LR",
      color: "Red",
      owner: " ",
   },
  ];

  function getMatches<T>( data : T[], criteria: (d: T) => boolean ) : T | undefined {
    return data.find((criteria))
}

getMatches<Bicycle>(bicycleShed, (b) => b.color == "Blue")
getMatches<Car>(carpark, (b) => b.color == "Red")

// logging it to the console to make sure it works
console.log(getMatches<Bicycle>(bicycleShed, (b) => b.color == "Blue"))
console.log(getMatches<Car>(carpark, (b) => b.color == "Red"))