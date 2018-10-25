package com.elorating.service;

import java.util.List;
import java.util.Optional;

public interface RepositoryService<T> {
    Optional<T> getById(String id);
    List<T> getAll();
    T save(T t);
    List<T> save(Iterable<T> t);
    void deleteById(String id);
    void deleteAll();
}
