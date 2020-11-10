package spbstu.course.six.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import spbstu.course.six.entity.Diagnos;
import spbstu.course.six.service.DiagnosService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api")
public class DiagnosController {
  private final DiagnosService diagnosService;

  @GetMapping("diagnos")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<List<Diagnos>> getAll() {
    return ResponseEntity.ok(diagnosService.getAll());
  }

  @GetMapping("diagnos/{id}")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<Diagnos> getOne(@PathVariable("id") Diagnos diagnos) {
    return ResponseEntity.ok(diagnos);
  }

  @PostMapping("diagnos")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<Diagnos> saveOne(@RequestBody Diagnos diagnos) {
    return ResponseEntity.ok(diagnosService.save(diagnos));
  }

  @PutMapping("diagnos/{id}")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<Diagnos> updateOne(@PathVariable("id") Diagnos diagnos, @RequestBody Diagnos updatedDiagnos) {
    return ResponseEntity.ok(diagnosService.update(updatedDiagnos, diagnos));
  }

  @DeleteMapping("diagnos/{id}")
  @PreAuthorize("isAuthenticated()")
  public void deleteOne(@PathVariable("id") Diagnos diagnos) {
    diagnosService.delete(diagnos);
  }
}
