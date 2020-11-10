package spbstu.course.six.service;

import spbstu.course.six.entity.Diagnos;

import java.util.List;

public interface DiagnosService {
  List<Diagnos> getAll();

  Diagnos save(Diagnos diagnos);

  Diagnos update(Diagnos source, Diagnos target);

  void delete(Diagnos diagnos);
}
