package spbstu.course.six.entity;

import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Data
@Entity
@Table(name = "people")
public class Person {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  private String firstname;
  private String lastname;
  private String pathername;

  @ManyToOne
  @OnDelete(action = OnDeleteAction.CASCADE)
  private Diagnos diagnos;

  @ManyToOne
  @OnDelete(action = OnDeleteAction.CASCADE)
  private Ward ward;
}
