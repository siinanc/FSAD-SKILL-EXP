package com.kluniversity.skill12_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository repo;

    public List<Student> getAllStudents() { return repo.findAll(); }

    public Student addStudent(Student s) { return repo.save(s); }

    public Student updateStudent(Long id, Student updated) {
        Optional<Student> existing = repo.findById(id);
        if (existing.isPresent()) {
            Student s = existing.get();
            s.setName(updated.getName());
            s.setEmail(updated.getEmail());
            s.setCourse(updated.getCourse());
            return repo.save(s);
        }
        return null;
    }

    public boolean deleteStudent(Long id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return true;
        }
        return false;
    }
}