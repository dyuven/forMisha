package spbstu.course.six.service;

import spbstu.course.six.entity.Ward;

import java.util.List;

public interface WardService {
  List<Ward> getAll();

  Ward save(Ward ward);

  Ward update(Ward source, Ward target);

  void delete(Ward ward);
}
