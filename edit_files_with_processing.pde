ArrayList<String> readLines(String path) {
  BufferedReader bufferedReader = createReader(path);
  ArrayList<String> lines = new ArrayList<String>();
  String line = "";
  //Gehe durch alle Zeilen, bis keine weitere mehr vorhanden ist
  //oder ein Fehler passiert
  while (line != null) {
    try {
      line = bufferedReader.readLine();
      if (line != null) {
        println(line);
        lines.add(line);
      }
    }
    catch (IOException e) {
      e.printStackTrace();
      line = null;
    }
  }
  return lines;
}

void writeLine(String line, String path) {
  ArrayList<String> lines = readLines(path); //Lese aktuelle Datei
  PrintWriter printWriter = createWriter(path);
  //Schreibe alle bisherigen Zeilen wieder
  for (int i = 0; i < lines.size(); i++) {
    printWriter.println(lines.get(i));
    println(lines.get(i));
  }
  //Füge Zeile hinzu
  printWriter.println(line);
  //Datei speichern
  printWriter.flush();
  printWriter.close();
}

void clearFile(String path) {
  PrintWriter printWriter = createWriter(path);
  printWriter.flush();
  printWriter.close();
}
