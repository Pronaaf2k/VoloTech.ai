import { PiArrowDown, PiArrowRight, PiCheckCircle, PiFileText, PiFolderOpen } from "react-icons/pi";

export function ProjectExamples() {
  return <div className="examples-grid">
    <article className="example example-portal">
      <div className="example-visual portal-visual" role="img" aria-label="Illustrative portal: customers can see order progress, access documents, and review the next action.">
        <div className="portal-sheet"><div className="demo-top"><span>Customer portal</span><span className="demo-label">EXAMPLE VIEW</span></div><p className="portal-title">Everything in one place.</p><div className="portal-order"><PiFolderOpen aria-hidden="true" /><div><strong>Your latest order</strong><span>Production underway</span></div><span className="status-pill">In progress</span></div><ol className="order-stages"><li className="complete">Confirmed</li><li className="complete">In production</li><li>Ready to deliver</li></ol><div className="portal-document"><PiFileText aria-hidden="true" /><span>Order documents</span><span>2 files</span></div><div className="portal-document"><PiCheckCircle aria-hidden="true" /><span>Delivery details</span><span>Confirmed</span></div></div>
      </div>
      <div className="example-caption"><span className="project-label">Illustrative example / Customer portal</span><h3>Less chasing.<br />More self-service.</h3><p>Give customers a secure place for orders and documents, and your team an admin view to keep everything moving.</p><p className="example-detail">Sign-in · Order history · File uploads · Admin tools</p></div>
    </article>
    <article className="example example-integration">
      <div className="example-visual integration-visual"><span className="demo-label">EXAMPLE WORKFLOW</span><ol className="flow-diagram" aria-label="Illustrative integration workflow"><li><span>01</span><strong>New enquiry</strong><small>From your website</small></li><li className="flow-connector" aria-hidden="true"><PiArrowDown /></li><li><span>02</span><strong>Check & route</strong><small>Validate details · Flag duplicates</small></li><li className="flow-connector" aria-hidden="true"><PiArrowDown /></li><li><span>03</span><strong>Ready for your team</strong><small>CRM record + email notification</small></li></ol><p className="flow-note">Needs a review? Keep a person in the loop.</p></div>
      <div className="example-caption"><span className="project-label">Illustrative example / Connected systems</span><h3>One enquiry.<br />No copy and paste.</h3><p>Connect a clear business website to the tools behind it. Validate incoming details, report errors, and put each enquiry in the right hands.</p><p className="example-detail">Website <PiArrowRight aria-hidden="true" /> Validation <PiArrowRight aria-hidden="true" /> CRM & email</p></div>
    </article>
  </div>;
}

