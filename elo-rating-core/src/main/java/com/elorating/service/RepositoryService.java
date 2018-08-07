package com.elorating.service;

import java.util.List;

public interface RepositoryService<T> {
    T getById(String id);
    List<T> getAll();
    T save(T t);
    List<T> save(Iterable<T> t);
    void deleteById(String id);
    void deleteAll();
}
