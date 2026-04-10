package com.flipkartclone.ecommerce.repository;

import com.flipkartclone.ecommerce.entity.AppUser;
import com.flipkartclone.ecommerce.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findByEmail(String email);
    List<AppUser> findByRole(Role role);
    boolean existsByEmail(String email);
}
