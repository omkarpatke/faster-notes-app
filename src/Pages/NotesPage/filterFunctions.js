const filterByLabel = (allNotes, label) => {
    const { home, food, office } = label;
    if (food && office && home) {
      return allNotes;
    } else if (food && office) {
      return allNotes.filter((note) => note.label !== "home");
    } else if (food && home) {
      return allNotes.filter((note) => note.label !== "office");
    } else if (office && home) {
      return allNotes.filter((note) => note.label !== "food");
    } else if (office) {
      return allNotes.filter((note) => note.label === "office");
    } else if (home) {
      return allNotes.filter((note) => note.label === "home");
    } else if (food) {
      return allNotes.filter((note) => note.label === "food");
    } else {
      return allNotes;
    }
  };
  
  const sortByDate = (allNotes, latest) => {
    let notes = allNotes;
    if (latest) {
      notes = notes?.sort(
        (a, b) => new Date(b.time) - new Date(a.time)
      );
      return notes
    } else {
      notes = notes?.sort(
        (a, b) => new Date(a.time) - new Date(b.time)
      );
      return notes;
    }
  };

  export { filterByLabel,sortByDate }