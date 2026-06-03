"use client"
import Modal from "@/app/components/GlobalModal";
import { FaEye } from "react-icons/fa";
import ProductView from "./ProductView";

export default function ViewModal({product}) {
  return (
    <Modal>
        <Modal.Open opens="view-product">
        <span role="button" ><FaEye /></span>
        </Modal.Open>
        <Modal.Window name="view-product">
            <ProductView product={product}/>
        </Modal.Window>
    </Modal>
  )
}
