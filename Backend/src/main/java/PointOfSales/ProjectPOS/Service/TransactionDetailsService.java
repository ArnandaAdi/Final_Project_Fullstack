package PointOfSales.ProjectPOS.Service;

import PointOfSales.ProjectPOS.DTO.TransactionDetailsDTO;
import PointOfSales.ProjectPOS.Entity.TransactionDetails;
import PointOfSales.ProjectPOS.Repository.TransactionDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionDetailsService {

    private final TransactionDetailsRepository transactionDetailRepository;

    @Autowired
    public TransactionDetailsService(TransactionDetailsRepository transactionDetailRepository) {
        this.transactionDetailRepository = transactionDetailRepository;
    }

    public List<TransactionDetailsDTO> getTransactionDetailsByTransactionId(Long transactionId) {
        if (transactionId == null || transactionId <= 0) {
            throw new IllegalArgumentException("ID produk tidak boleh null dan harus berupa angka positif");
        }
        List<TransactionDetails> transactionDetails = transactionDetailRepository.findByTransactionId(transactionId);

        return transactionDetails.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private TransactionDetailsDTO convertToDTO(TransactionDetails transactionDetails) {
        TransactionDetailsDTO dto = new TransactionDetailsDTO();
        dto.setTransaction_id(transactionDetails.getTransaction().getId());
        dto.setProduct_id(transactionDetails.getProduct().getId());
        dto.setProduct_name(transactionDetails.getProduct().getTitle());
        dto.setProduct_price(transactionDetails.getProduct().getPrice());
        dto.setQuantity(transactionDetails.getQuantity());
        dto.setSub_total(transactionDetails.getSubtotal());
        return dto;
    }
}
