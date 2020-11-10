package spbstu.course.six.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import spbstu.course.six.entity.Diagnos;
import spbstu.course.six.repository.DiagnosRepository;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class DiagnosServiceImp implements DiagnosService {
  private final DiagnosRepository diagnosRepository;

  @Override
  public List<Diagnos> getAll() {
    return StreamSupport
        .stream(diagnosRepository.findAll().spliterator(), false)
        .collect(Collectors.toList());
  }

  @Override
  public Diagnos save(Diagnos diagnos) {
    return diagnosRepository.save(diagnos);
  }

  @Override
  public Diagnos update(Diagnos source, Diagnos target) {
    BeanUtils.copyProperties(source, target, "id");

    return diagnosRepository.save(target);
  }

  @Override
  public void delete(Diagnos diagnos) {
    diagnosRepository.delete(diagnos);
  }
}
