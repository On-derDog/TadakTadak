package com.tadak.userservice.domain.member.repository;

import com.tadak.userservice.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    boolean existsByEmail(String email);

    boolean existsByUsername(String username);

    Optional<Member> findByEmail(String email);
}
